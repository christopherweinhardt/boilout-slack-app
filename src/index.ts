import Fastify from 'fastify'
import { WebClient } from '@slack/web-api'
import * as fs from 'node:fs/promises'
import ADD_FRYER_MODAL from './modals';

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

enum FryerType {
    Open = 0,
    Pressure = 1,
    Potato = 2
}
type Fryer = {
    name: string;
    type: FryerType;
    last_cleaned: Date;
}
type FryerInput = {
    name: string;
    type: FryerType;
    last_cleaned: number;
}
type StoreConfig = {
    store_id: number;
    cleaning_intervals: number[];
    fryers: Fryer[];
    boilout_channel_id: string;
}

let config: StoreConfig[] = [];

const load_config = async () => {
    // check if file exists, create
    await fs.stat('config.json').catch(async (e) => {
        await fs.writeFile('config.json', JSON.stringify([{
            store_id: 0,
            cleaning_intervals: [36, 30, 10],
            fryers: [],
            boilout_channel_id: '',
        }], null, "\t"));
    })

    // load the data
    config = await JSON.parse(await fs.readFile('config.json', 'utf-8'));
}
load_config();

const fastify = Fastify({
    logger: false
})

// slack

const trigger = "VALID_TRIGGER_ID";
(async () => {
    const result = await web.views.open({
        trigger_id: trigger,
        view: ADD_FRYER_MODAL
    })
    // The result contains an identifier for the root view, view.id
    if (result.view && result.view.id) {
        console.log(`Successfully opened root view ${result.view.id}`);
    } else {
        console.log('Failed to open root view: view or view.id is undefined');
    }
})();








// Declare a route
fastify.post('/addfryer', function (request, reply) {
    const body = request.body as FryerInput;
    console.log(body);
    if (!body)
        return reply.code(400).send({ message: 'Bad input' });
    reply.send({ message: `Added ${body.name} successfully!` });
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}

    console.log(`Server now listening on ${address}`);
})