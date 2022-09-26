# Virtual Stoodeeoh - VSChat Client

Client for VSChat Server.

## Install

```
npm i @vstoodeeoh/vschat-client
```

## Hooks

```
useVsChat(serverUrl, secretKey, userId);
useConversations();
useMessages();
```

## Initialize VSChat

```
import { useVSChat, useConversation, useMessages } from "@vstoodeeoh/vschat-client"
const vsChat = useVSChat("http://localhost:5555", "1234", userId);
const vsCon = useConversations();
const vsMsg = useMessages();
```

## Examples

Here are some basic examples to be used. This pacakage was designed by having "freedom" in mind, allowing you to use the information as you find fit.

### Get All Conversations For User

```
const vsCon = useConversations();
const myConversations = vsCon.conversations;
console.log(myConversations)

/* Returns
[
    {
        "_id": "6330d103bb8c954650c1d950",
        "participants": [
            "6330b9202cde875e935aeadx",
            "6330b9202cde875e935aeady"
        ],
        "createdAt": "2022-09-25T22:06:59.332Z",
        "updatedAt": "2022-09-25T22:06:59.332Z",
        "__v": 0
    }
]
*/
```

### Get Messages In A Conversation

`By Default it will fetch messages for the first conversation`

```
const vsMsg = useMessages();
const messages = vsMsg.texts;
console.log(messages)

/* Returns
[
    {
        "conversationId": "633108aabb8c954650c1d9af",
        "sender": "6330b9202cde875e935aeadx",
        "text": "Testing",
        "_id": "63310b79bb8c954650c1da07",
        "createdAt": "2022-09-26T02:16:25.854Z",
        "updatedAt": "2022-09-26T02:16:25.854Z",
        "__v": 0
    }
]
*/
```

### Set Current Conversation

```
const vsCon = useConversations();
vsCon.setConversation("Conversation ID);
```

### Send Message

`By default sendMessage sends a message to the selected conversation unless a conversation ID was specified.`

```
const vsMsg = useMessages();
vsMsg.sendMessage("Hello VS Chat"); // Send to current conversation
// Sending message to specific conversation will be added next release.
```

## Notes

A [VSChat Server](https://www.npmjs.com/package/@vstoodeeoh/vschat-server) must be setup before you can utilize this pacakage

[Virtual Stoodeeoh Inc.](https://virtualstoodeeoh.com/)
