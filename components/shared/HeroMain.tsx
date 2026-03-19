import { LightningIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";

export default function HeroMain() {
  return (
    <section className="py-12 flex gap-12">
      <div className="flex flex-col gap-6 w-[60%]">
        <h2 className="text-6xl font-black">
          <span>Shorten your links</span>
          <br />
          <span className="text-primary">instantly.</span>
        </h2>
        <h3 className="w-3/4">
          Experience the editorial standard of link management. Beautifully
          simple URL shortening with powerful click tracking and detailed
          analytics.
        </h3>
        <div>
          <div>
            <p>Original URL</p>
            <input
              type="text"
              placeholder="https://your-long-destination-url.com/path"
            />
          </div>
          <div>
            <p>Expires At</p>
            <input type="date" />
          </div>
          <Button>
            Shorten URL <LightningIcon />
          </Button>
        </div>
      </div>
      <div className="w-[40%]"></div>
    </section>
  );
}
