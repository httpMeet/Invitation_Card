import { format } from "date-fns"
import { Baby, Calendar, Clock, MapPin } from "lucide-react"

interface BabyShowerCardProps {
  data: {
    hostName: string
    parentNames?: string
    babyGender?: string
    eventDate: Date
    eventTime: string
    eventLocation: string
    message?: string
  }
}

export function BabyShowerCard({ data }: BabyShowerCardProps) {
  // Set color theme based on baby gender
  const colorTheme = {
    boy: {
      gradient: "from-blue-400 to-cyan-600",
      accent: "text-blue-200",
      decoration: "bg-blue-300",
    },
    girl: {
      gradient: "from-pink-400 to-rose-600",
      accent: "text-pink-200",
      decoration: "bg-pink-300",
    },
    surprise: {
      gradient: "from-yellow-400 to-amber-600",
      accent: "text-yellow-200",
      decoration: "bg-yellow-300",
    },
  }

  const theme = data.babyGender ? colorTheme[data.babyGender as keyof typeof colorTheme] : colorTheme.surprise

  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className={`absolute top-10 left-10 w-24 h-24 rounded-full ${theme.decoration} opacity-10`}></div>
        <div className={`absolute bottom-20 right-10 w-32 h-32 rounded-full ${theme.decoration} opacity-10`}></div>
        <div className={`absolute top-1/3 right-20 w-16 h-16 rounded-full ${theme.decoration} opacity-10`}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full text-white p-8">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium">You're invited to a</h3>
          <h1 className="text-4xl font-bold">Baby Shower</h1>

          {data.parentNames && (
            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              <span className="text-xl">for</span>
              <span className="text-2xl font-semibold">{data.parentNames}</span>
              <div className="flex items-center gap-2 mt-2">
                <Baby className={`h-6 w-6 ${theme.accent}`} />
                <span className="text-lg">
                  {data.babyGender === "boy"
                    ? "It's a Boy!"
                    : data.babyGender === "girl"
                      ? "It's a Girl!"
                      : "Baby on the Way!"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className={`h-5 w-5 ${theme.accent}`} />
            <div>
              <p className="text-sm opacity-80">Date</p>
              <p className="font-medium">{format(data.eventDate, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className={`h-5 w-5 ${theme.accent}`} />
            <div>
              <p className="text-sm opacity-80">Time</p>
              <p className="font-medium">{data.eventTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className={`h-5 w-5 ${theme.accent}`} />
            <div>
              <p className="text-sm opacity-80">Location</p>
              <p className="font-medium">{data.eventLocation}</p>
            </div>
          </div>

          {data.message && (
            <div className="pt-2 border-t border-white/20">
              <p className="italic text-sm">{data.message}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm opacity-80">Hosted by</p>
          <p className="font-medium text-lg">{data.hostName}</p>
        </div>
      </div>
    </div>
  )
}
