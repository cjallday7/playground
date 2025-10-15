import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { getRecentlyPlayedGames } from "@/lib/steam";
import RecentlyPlayed from "@/components/RecentlyPlayed";

export default function Home() {
  return (
    <div className="font-sans max-w-7xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-6xl font-bold">Hello, @hypraktiv 👋🏿</h1>
        <p className="text-lg text-gray-500">
          Here are the latest updates on your gaming backlog.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Recently Played on Steam</h2>
          {/* <RecentlyPlayed /> */}
          <div className="flex gap-6 flex-wrap">
            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer h-full">
              <Link
                href="https://store.steampowered.com/app/2707930/Palia/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer h-full">
              <Link
                href="https://store.steampowered.com/app/3527290/PEAK/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer h-full">
              <Link
                href="https://store.steampowered.com/app/3224770/Umamusume_Pretty_Derby/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer h-full">
              <Link
                href="https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_1525_ReMIX/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardHeader>
                  <Image
                    src="/images/kh2.png"
                    alt="Kingdom Hearts II"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">Kingdom Hearts II</CardTitle>
                </CardHeader>
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer h-full">
              <Link
                href="https://store.steampowered.com/app/2379780/Balatro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardHeader>
                  <Image
                    src="/images/balatro.png"
                    alt="Balatro"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">Balatro</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </section>

        {/* Recently Played on Xbox */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Recently Played on Xbox</h2>
          {/* <RecentlyPlayed /> */}
          <div className="flex gap-6 flex-wrap">
            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer">
              <Link
                href="https://www.xbox.com/en-US/games/store/metaphor-refantazio/9N5DV8310XP7/0010"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer">
              <Link
                href="https://www.xbox.com/en-us/games/store/hollow-knight-silksong/9n116v0599hb"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer">
              <Link
                href="https://www.xbox.com/en-US/games/store/street-fighter-6/9NM79B7N9JM6/0010"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer">
              <Link
                href="https://www.xbox.com/en-sg/games/store/south-of-midnight/9njcvgs6t30k"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardHeader>
                  <Image
                    src="/images/South_of_Midnight.png"
                    alt="South of Midnight cover art"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">South of Midnight</CardTitle>
                </CardHeader>
              </Link>
            </Card>

            <Card className="min-w-[200px] flex-1 max-w-[280px] hover:shadow-lg dark:hover:shadow-white/20 transition-shadow cursor-pointer">
              <Link
                href="https://www.xbox.com/en-SG/games/store/party-animals/9mz08rdq4dm1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardHeader>
                  <Image
                    src="/images/party_animals.png"
                    alt="Party Animals cover art"
                    width={200}
                    height={200}
                    className="rounded-md w-full h-48 object-cover mb-2"
                  />
                  <CardTitle className="text-left">Party Animals</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Game Library</h2>
          <div className="flex gap-6 flex-wrap">
            <Table>
              <TableCaption>A list of your video games.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Playtime (Hours)</TableHead>
                  <TableHead>Achievements</TableHead>
                  <TableHead>Last Played</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Metaphor: ReFantazio</TableCell>
                  <TableCell>Xbox</TableCell>
                  <TableCell>104</TableCell>
                  <TableCell>22/44</TableCell>
                  <TableCell>10-14-2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Umamusume: Pretty Derby</TableCell>
                  <TableCell>Steam</TableCell>
                  <TableCell>63</TableCell>
                  <TableCell>16/20</TableCell>
                  <TableCell>10-14-2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
      </div>
    </div>
  );
}
