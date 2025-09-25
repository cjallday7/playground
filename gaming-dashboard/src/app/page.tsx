import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getRecentlyPlayedGames } from "@/lib/steam";
import RecentlyPlayed from "@/components/RecentlyPlayed";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main>
        <h1 className="text-2xl font-bold">Hello, @hypraktiv 👋🏿</h1>
        <p className="text-lg text-gray-500">
          Here are the latest updates on your gaming backlog.
        </p>

        <section>
          <h2 className="text-xl font-bold mb-4">Recently Played on Steam</h2>
          {/* <RecentlyPlayed /> */}
          <div className="flex gap-6 flex-wrap">
            <Card className="min-w-[200px] flex-1 max-w-[280px]">
              <CardHeader>
                <Image
                  src="/images/palia.png"
                  alt="Palia"
                  width={200}
                  height={200}
                  className="rounded-md w-full h-48 object-cover mb-2"
                />
                <CardTitle className="text-left">Palia</CardTitle>
              </CardHeader>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px]">
              <CardHeader>
                <Image
                  src="/images/peak.png"
                  alt="PEAK"
                  width={200}
                  height={200}
                  className="rounded-md w-full h-48 object-cover mb-2"
                />
                <CardTitle className="text-left">PEAK</CardTitle>
              </CardHeader>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px]">
              <CardHeader>
                <Image
                  src="/images/pretty_derby.png"
                  alt="Umamusume: Pretty Derby"
                  width={200}
                  height={200}
                  className="rounded-md w-full h-48 object-cover mb-2"
                />
                <CardTitle className="text-left">
                  Umamusume: Pretty Derby
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Recently Played on Xbox */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recently Played on Xbox</h2>
          {/* <RecentlyPlayed /> */}
          <div className="flex gap-6 flex-wrap">
            <Link
              href="https://www.xbox.com/en-US/games/store/metaphor-refantazio/9N5DV8310XP7/0010"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Image
                    src="/images/metaphor.png"
                    alt="Metaphor: ReFantazio"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">
                    Metaphor: ReFantazio
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link
              href="https://www.xbox.com/en-us/games/store/hollow-knight-silksong/9n116v0599hb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Image
                    src="/images/silksong.png"
                    alt="Hollow Knight: Silksong"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">
                    Hollow Knight: Silksong
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>

            <Link
              href="https://www.xbox.com/en-US/games/store/street-fighter-6/9NM79B7N9JM6/0010"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Image
                    src="/images/sf6.png"
                    alt="Street Fighter 6"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">Street Fighter 6</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* Latest Games 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold">Latest Games</h2>
            <p className="text-sm text-gray-500">Here are the latest games you've added to your backlog.</p>
          </div>
        </div>
        */}
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
