import { format } from "date-fns"
import { Calendar, Clock, Heart, MapPin } from "lucide-react"

interface MarriageCardProps {
  data: {
    hostName: string
    brideName?: string
    groomName?: string
    eventDate: Date
    eventTime: string
    eventLocation: string
    message?: string
  }
}

export function MarriageCard({ data }: MarriageCardProps) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-600"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-teal-200 opacity-10"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-blue-200 opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full text-white p-8">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-medium">You are cordially invited to the</h3>
          <h1 className="text-4xl font-bold">Wedding Ceremony</h1>

          {(data.brideName || data.groomName) && (
            <div className="mt-4 flex items-center justify-center gap-3 text-2xl font-semibold">
              {data.brideName && <span>{data.brideName}</span>}
              {data.brideName && data.groomName && <Heart className="h-5 w-5 text-pink-300 mx-2" />}
              {data.groomName && <span>{data.groomName}</span>}
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-teal-200" />
            <div>
              <p className="text-sm opacity-80">Date</p>
              <p className="font-medium">{format(data.eventDate, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-teal-200" />
            <div>
              <p className="text-sm opacity-80">Time</p>
              <p className="font-medium">{data.eventTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-teal-200" />
            <div>
              <p className="text-sm opacity-80">Venue</p>
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
          <p className="text-sm opacity-80">With compliments from</p>
          <p className="font-medium text-lg">{data.hostName}</p>
        </div>
      </div>
    </div>
  )
}
