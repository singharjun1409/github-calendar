// main.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const username = url.pathname.slice(1);

  if (!username) {
    return new Response("Missing GitHub username", { status: 400 });
  }

  const res = await fetch(`https://github.com/users/${username}/contributions`);
  const html = await res.text();

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
