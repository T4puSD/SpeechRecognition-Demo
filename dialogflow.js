import { ApiAiClient } from "./node_modules/api-ai-javascript";

const client = new ApiAiClient({
  accessToken: "71b34759a3b545268e86305601721fd3"
})

  .textRequest("Hello!")
  .then(response => {
    /* do something */
  })
  .catch(error => {
    /* do something here too */
  });
