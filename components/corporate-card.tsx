import { format } from "date-fns"
import { Building2, Calendar, Clock, MapPin, Shirt } from "lucide-react"

interface CorporateCardProps {
  data: {
    hostName: string
    companyName?: string
    eventTitle?: string
    dresscode?: string
    eventDate: Date
    eventTime: string
    eventLocation: string
    message?: string
  }
}

export function CorporateCard({ data }: CorporateCardProps) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-slate-500 opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-slate-400 opacity-10"></div>
        <div className="absolute top-1/3 left-20 w-16 h-16 rounded-full bg-slate-300 opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full text-white p-8">
        <div className="text-center space-y-2">
          {data.companyName && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-slate-300" />
              <h3 className="text-xl font-medium">{data.companyName}</h3>
            </div>
          )}
          <h3 className="text-xl font-medium">You are cordially invited to</h3>
          <h1 className="text-4xl font-bold">{data.eventTitle || "Corporate Event"}</h1>
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-slate-300" />
            <div>
              <p className="text-sm opacity-80">Date</p>
              <p className="font-medium">{format(data.eventDate, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-slate-300" />
            <div>
              <p className="text-sm opacity-80">Time</p>
              <p className="font-medium">{data.eventTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-slate-300" />
            <div>
              <p className="text-sm opacity-80">Venue</p>
              <p className="font-medium">{data.eventLocation}</p>
            </div>
          </div>

          {data.dresscode && (
            <div className="flex items-center gap-3">
              <Shirt className="h-5 w-5 text-slate-300" />
              <div>
                <p className="text-sm opacity-80">Dress Code</p>
                <p className="font-medium">{data.dresscode}</p>
              </div>
            </div>
          )}

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
