import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    res.json({ reply: data?.choices?.[0]?.message?.content || "Ошибка ответа" });

  } catch (err) {
    res.status(500).json({ reply: "Сервер упал 💀" });
  }
});

export default router;
