// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LearningMode from "./LearningMode";
vi.mock("./context/AuthContext", () => ({ useAuth: () => ({ user: null, loading: false }) }));
beforeEach(() => { localStorage.clear(); vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ configured: false }) })); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it("opens architecture chat even with a legacy textbook query", async () => {
  render(<MemoryRouter initialEntries={["/learning?course=textbook"]}><LearningMode /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Ask about architecture" })).toBeInTheDocument();
  expect(screen.queryByText("Textbook learning")).not.toBeInTheDocument();
  await screen.findByText(/Live AI is not configured yet/);
  fireEvent.click(screen.getByRole("button", { name: "Exercises & progress" }));
  expect(screen.getByRole("region", { name: "Architecture lessons" })).toBeInTheDocument();
  expect(screen.getByText(/0 of 7 exercises complete/)).toBeInTheDocument();
});
it("sends questions to the architecture endpoint and saves successful replies", async () => {
  vi.mocked(fetch).mockImplementation(async (url) => ({ ok: true, json: async () => String(url).endsWith('/availability') ? { configured: true } : { answer: "Trace the arrival route in plan." } }) as Response);
  render(<MemoryRouter><LearningMode /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "Explain circulation" } });
  fireEvent.click(screen.getByRole("button", { name: "Ask tutor" }));
  await screen.findByText("Trace the arrival route in plan.");
  expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/studio/learn'), expect.objectContaining({ method: 'POST' }));
  await waitFor(() => expect(localStorage.getItem('architecture-chat:v1:guest')).toContain('Explain circulation'));
});
it("preserves the question when the API is unavailable", async () => {
  vi.mocked(fetch).mockImplementation(async (url) => ({ ok: String(url).endsWith('/availability'), status: 503, json: async () => ({ configured: false }) }) as Response);
  render(<MemoryRouter><LearningMode /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Your question"), { target: { value: "Explain daylight" } });
  fireEvent.click(screen.getByRole("button", { name: "Ask tutor" }));
  await screen.findByRole("alert");
  expect(screen.getByLabelText("Your question")).toHaveValue("Explain daylight");
  expect(screen.getByRole("button", { name: "Ask tutor" })).toBeEnabled();
});
