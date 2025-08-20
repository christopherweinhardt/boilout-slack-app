import { ModalView } from '@slack/web-api'

const ADD_FRYER_MODAL: ModalView = {
    type: "modal",
    title: {
        type: "plain_text",
        text: "Add Fryer",
        emoji: true
    },
    submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true
    },
    close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true
    },
    blocks: [
        {
            type: "input",
            block_id: "fryer_name",
            element: {
                type: "plain_text_input",
                action_id: "fryer_name_input",
                placeholder: {
                    type: "plain_text",
                    text: "Machine #1",
                    emoji: true
                }
            },
            label: {
                type: "plain_text",
                text: "Fryer Name",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "fryer_type",
            element: {
                type: "static_select",
                action_id: "fryer_type_input",
                placeholder: {
                    type: "plain_text",
                    text: "Select Type",
                    emoji: true
                },
                options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Open Fryer",
                            emoji: true
                        },
                        value: "0"
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Pressure Fryer",
                            emoji: true
                        },
                        value: "1"
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Potato Fryer",
                            emoji: true
                        },
                        value: "2"
                    }
                ]
            },
            label: {
                type: "plain_text",
                text: "Fryer Type",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "boilout_date",
            element: {
                type: "datepicker",
                initial_date: "2025-08-01",
                placeholder: {
                    type: "plain_text",
                    text: "Select a date",
                    emoji: true
                },
                action_id: "boilout_date_input"
            },
            label: {
                type: "plain_text",
                text: "Last Boil Out",
                emoji: true
            }
        }
    ]
};

export default ADD_FRYER_MODAL;