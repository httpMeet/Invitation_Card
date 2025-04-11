import { format } from "date-fns"
import { Cake, Clock, MapPin } from "lucide-react"

interface BirthdayCardProps {
  data: {
    hostName: string
    celebrantName?: string
    celebrantAge?: string
    eventDate: Date
    eventTime: string
    eventLocation: string
    message?: string
  }
}

export function BirthdayCard({ data }: BirthdayCardProps) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-yellow-300 opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-pink-300 opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-purple-300 opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full text-white p-8">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium">You're Invited to</h3>
          <h1 className="text-4xl font-bold">{data.celebrantName ? data.celebrantName + "'s" : "A"} Birthday Party!</h1>
          {data.celebrantAge && <div className="mt-2 text-2xl font-semibold">Turning {data.celebrantAge}</div>}
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Cake className="h-5 w-5 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Date</p>
              <p className="font-medium">{format(data.eventDate, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Time</p>
              <p className="font-medium">{data.eventTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-yellow-300" />
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
