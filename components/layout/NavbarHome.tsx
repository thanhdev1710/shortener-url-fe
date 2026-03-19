import { NAME_APP } from "@/consts/base";
import { Button } from "../ui/button";
import MenuHome from "./MenuHome";
import {
  BellIcon,
  QuestionIcon,
  SignInIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function NavbarHome() {
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-black text-primary">{NAME_APP}</h1>
        <MenuHome />
      </div>
      <div className="flex items-center gap-6">
        <Button className="text-base px-4 py-2! h-full">
          <SignInIcon />
          <p>Login with Google</p>
        </Button>
        <Button>
          <BellIcon className="h-6 w-full" />
        </Button>
        <Button>
          <QuestionIcon className="h-6 w-full" />
        </Button>
      </div>
    </nav>
  );
}
