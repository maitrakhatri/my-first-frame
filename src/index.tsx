import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";

export const app = new Frog({
  title: "Hello World",
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  const { inputText, status } = c;
  const username = inputText;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to top, #432889, #17101F)"
              : "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `Hiee ${username ? username : "Anon"} !! Nice meeting you`
            : "Hello World !!"}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 30,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `I'm here to play with frames, feel free to join me on this adventure  :)`
            : `Don't be shy, say hie`}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="What should I call you ?" />,
      <Button>{status === "response" ? "Say hi again :)" : "Say hi !"}</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

devtools(app, { serveStatic });
