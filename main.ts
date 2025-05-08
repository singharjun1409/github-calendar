import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const username = url.pathname.slice(1);

  if (!username) {
    return new Response("Missing GitHub username", { status: 400 });
  }

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0", // This is the key fix
      },
    });
    const html = await res.text();

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Failed to fetch GitHub contributions", { status: 500 });
  }
});
