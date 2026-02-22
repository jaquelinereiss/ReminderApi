import "./env.js"; 

import app from "./app.js";

app.listen(3000, "0.0.0.0", () => {
  console.log("API rodando em todas as interfaces");
});
