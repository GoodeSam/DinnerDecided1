import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider, useI18n, LanguageSwitcher } from "@/lib/i18n-react";
import { setLocale } from "@/lib/i18n";

function TestConsumer() {
  const { t, locale, setLocale: switchLocale } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="title">{t("app.title")}</span>
      <span data-testid="tagline">{t("app.tagline")}</span>
      <span data-testid="interpolated">{t("recipes.found", { count: 3 })}</span>
      <button data-testid="switch-zh" onClick={() => switchLocale("zh")}>中文</button>
      <button data-testid="switch-en" onClick={() => switchLocale("en")}>EN</button>
    </div>
  );
}

describe("I18nProvider + useI18n hook", () => {
  beforeEach(() => {
    setLocale("en");
  });

  it("provides English translations by default", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("en");
    expect(screen.getByTestId("title").textContent).toBe("DinnerDecided");
    expect(screen.getByTestId("tagline").textContent).toBe("What should I cook?");
  });

  it("switches to Chinese when setLocale is called", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    fireEvent.click(screen.getByTestId("switch-zh"));
    expect(screen.getByTestId("locale").textContent).toBe("zh");
    expect(screen.getByTestId("title").textContent).toBe("今晚吃什么");
    expect(screen.getByTestId("tagline").textContent).toBe("今天做什么菜？");
  });

  it("supports interpolation in React context", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    expect(screen.getByTestId("interpolated").textContent).toBe("3 recipes found");
    fireEvent.click(screen.getByTestId("switch-zh"));
    expect(screen.getByTestId("interpolated").textContent).toBe("找到 3 个食谱");
  });

  it("can switch back and forth", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );
    fireEvent.click(screen.getByTestId("switch-zh"));
    expect(screen.getByTestId("title").textContent).toBe("今晚吃什么");
    fireEvent.click(screen.getByTestId("switch-en"));
    expect(screen.getByTestId("title").textContent).toBe("DinnerDecided");
  });
});

describe("LanguageSwitcher component", () => {
  beforeEach(() => {
    setLocale("en");
  });

  it("renders both language options", () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("中文")).toBeInTheDocument();
  });

  it("highlights the active language", () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );
    const enButton = screen.getByText("EN");
    expect(enButton.className).toContain("bg-amber");
  });

  it("switches language when clicked", () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
        <TestConsumer />
      </I18nProvider>
    );
    fireEvent.click(screen.getAllByText("中文")[0]);
    expect(screen.getByTestId("locale").textContent).toBe("zh");
  });
});
