"""
Gemini integration service.

Wraps Google Generative AI so the rest of the app never talks to the SDK
directly. Falls back to a helpful rule-based response if no API key is
configured, so the app remains fully demoable without credentials.
"""
import logging
from typing import Literal

from config import get_settings
from schemas.chat import ChatMessageSchema

logger = logging.getLogger("stadiumgpt.gemini")

SYSTEM_PROMPT = """You are StadiumGPT, the official AI assistant for FIFA World Cup 2026 stadiums.
You help fans with match schedules, seating information, parking availability, ticket FAQs,
stadium rules, food court locations, and accessibility services.

Guidelines:
- Be concise, friendly, and precise. Prefer short paragraphs or bullet points.
- If you don't have real-time data for a specific stadium, give general, safe, and reasonable
  guidance and suggest checking the venue's official signage or staff for exact details.
- Never make up specific gate numbers, exact prices, or legal claims — speak in general terms
  when specifics are unknown.
- Always keep safety-related answers clear and actionable.
- Respond in the language requested (English, Hindi, Kannada, or Spanish) when specified.
"""

LANGUAGE_NAMES = {
    "en": "English",
    "hi": "Hindi",
    "kn": "Kannada",
    "es": "Spanish",
}

FALLBACK_RESPONSES = {
    "schedule": "Match schedules are typically published on the official FIFA World Cup 2026 app and stadium screens. Gates usually open 3 hours before kickoff.",
    "seat": "You can find your seating section printed on your digital ticket. Stewards near each entrance can direct you to your section.",
    "parking": "Parking availability varies by lot. Arrive early — VIP and North lots tend to fill up fastest on matchdays.",
    "ticket": "Tickets are non-transferable outside the official resale platform. Re-entry is usually not permitted once you exit the stadium.",
    "rule": "Standard stadium rules prohibit outside food/drink, professional cameras, and large bags. Check official guidelines for the full list.",
    "food": "Food courts are located on the concourse level near each main entrance, offering a mix of local and international options.",
    "accessib": "Accessibility services, including wheelchair access and assisted listening devices, are available at guest services near every main gate.",
    "default": "I can help with match schedules, seating, parking, tickets, stadium rules, food courts, and accessibility services. Could you tell me a bit more about what you need?",
}


def _fallback_reply(message: str) -> str:
    lowered = message.lower()
    for key, response in FALLBACK_RESPONSES.items():
        if key in lowered:
            return response
    return FALLBACK_RESPONSES["default"]


class GeminiService:
    def __init__(self):
        self.settings = get_settings()
        self._model = None
        if self.settings.is_gemini_configured:
            try:
                import google.generativeai as genai

                genai.configure(api_key=self.settings.gemini_api_key)
                self._model = genai.GenerativeModel(
                    model_name=self.settings.gemini_model,
                    system_instruction=SYSTEM_PROMPT,
                )
            except Exception as exc:  # pragma: no cover
                logger.error("Failed to initialize Gemini model: %s", exc)
                self._model = None

    def is_available(self) -> bool:
        return self._model is not None

    def generate_reply(
        self,
        message: str,
        history: list[ChatMessageSchema],
        language: Literal["en", "hi", "kn", "es"] = "en",
    ) -> str:
        if not self._model:
            return _fallback_reply(message)

        try:
            gemini_history = []
            for msg in history[-10:]:
                role = "user" if msg.role == "user" else "model"
                gemini_history.append({"role": role, "parts": [msg.content]})

            chat = self._model.start_chat(history=gemini_history)
            lang_instruction = f"\n\n(Please respond in {LANGUAGE_NAMES.get(language, 'English')}.)"
            response = chat.send_message(message + lang_instruction)
            return response.text.strip()
        except Exception as exc:
            logger.error("Gemini generation failed: %s", exc)
            return _fallback_reply(message)


gemini_service = GeminiService()
