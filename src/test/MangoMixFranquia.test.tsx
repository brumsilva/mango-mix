import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MangoMixFranquia from "@/pages/MangoMixFranquia";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe("MangoMixFranquia", () => {
  it("apresenta a proposta da franquia e o destaque do Instagram", () => {
    render(<MangoMixFranquia />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /uma marca com milhões de views.*uma franquia pronta para a sua cidade/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("1,2 mi")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver no instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/mangomixoficial/",
    );
  });
});
