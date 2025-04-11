"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import html2canvas from "html2canvas"
import FileSaver from "file-saver"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { BirthdayCard } from "@/components/birthday-card"
import { MarriageCard } from "@/components/marriage-card"
import { GraduationCard } from "@/components/graduation-card"
import { BabyShowerCard } from "@/components/baby-shower-card"
import { CorporateCard } from "@/components/corporate-card"

const formSchema = z.object({
  invitationType: z.enum(["birthday", "marriage", "graduation", "babyShower", "corporate"]),
  hostName: z.string().min(2, {
    message: "Host name must be at least 2 characters.",
  }),
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  eventTime: z.string().min(1, {
    message: "Event time is required.",
  }),
  eventLocation: z.string().min(2, {
    message: "Event location is required.",
  }),
  message: z.string().optional(),
  // Birthday specific fields
  celebrantName: z.string().optional(),
  celebrantAge: z.string().optional(),
  // Marriage specific fields
  brideName: z.string().optional(),
  groomName: z.string().optional(),
  // Graduation specific fields
  graduateName: z.string().optional(),
  degree: z.string().optional(),
  institution: z.string().optional(),
  // Baby Shower specific fields
  parentNames: z.string().optional(),
  babyGender: z.enum(["boy", "girl", "surprise"]).optional(),
  // Corporate specific fields
  companyName: z.string().optional(),
  eventTitle: z.string().optional(),
  dresscode: z.string().optional(),
})

export default function InvitationForm() {
  const [showPreview, setShowPreview] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitationType: "birthday",
      hostName: "",
      message: "",
      eventTime: "",
      eventLocation: "",
      celebrantName: "",
      celebrantAge: "",
      brideName: "",
      groomName: "",
      graduateName: "",
      degree: "",
      institution: "",
      parentNames: "",
      babyGender: "surprise",
      companyName: "",
      eventTitle: "",
      dresscode: "",
    },
  })

  const invitationType = form.watch("invitationType")

  function onSubmit(values: z.infer<typeof formSchema>) {
    setShowPreview(true)
  }

  const downloadInvitation = () => {
    const cardElement = document.getElementById("invitation-card")
    if (cardElement) {
      html2canvas(cardElement, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            FileSaver.saveAs(blob, `${invitationType}-invitation-${format(new Date(), "yyyy-MM-dd")}.png`)
          }
        })
      })
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="invitationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invitation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                      <SelectItem value="marriage">Marriage Ceremony</SelectItem>
                      <SelectItem value="graduation">Graduation Ceremony</SelectItem>
                      <SelectItem value="babyShower">Baby Shower</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hostName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter host name" {...field} />
                  </FormControl>
                  <FormDescription>The person(s) hosting the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {invitationType === "birthday" && (
              <>
                <FormField
                  control={form.control}
                  name="celebrantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celebrant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter celebrant name" {...field} />
                      </FormControl>
                      <FormDescription>The person celebrating their birthday</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="celebrantAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celebrant Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {invitationType === "marriage" && (
              <>
                <FormField
                  control={form.control}
                  name="brideName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bride Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bride name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Groom Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter groom name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {invitationType === "graduation" && (
              <>
                <FormField
                  control={form.control}
                  name="graduateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduate Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter graduate name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree/Certification</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bachelor of Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school or university name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {invitationType === "babyShower" && (
              <>
                <FormField
                  control={form.control}
                  name="parentNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Names</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John and Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="babyGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baby Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="boy">Boy</SelectItem>
                          <SelectItem value="girl">Girl</SelectItem>
                          <SelectItem value="surprise">Surprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {invitationType === "corporate" && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Annual Gala, Product Launch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dresscode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dress Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Formal, Business Casual" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <DatePicker date={field.value} setDate={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 6:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional message" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Generate Invitation
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex flex-col items-center justify-center">
        {showPreview ? (
          <div className="space-y-4 w-full">
            <div id="invitation-card" className="w-full">
              {invitationType === "birthday" ? (
                <BirthdayCard data={form.getValues()} />
              ) : invitationType === "marriage" ? (
                <MarriageCard data={form.getValues()} />
              ) : invitationType === "graduation" ? (
                <GraduationCard data={form.getValues()} />
              ) : invitationType === "babyShower" ? (
                <BabyShowerCard data={form.getValues()} />
              ) : (
                <CorporateCard data={form.getValues()} />
              )}
            </div>
            <Button onClick={downloadInvitation} className="w-full" variant="outline">
              Download Invitation
            </Button>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-lg w-full">
            <p className="text-muted-foreground">
              Fill out the form and click "Generate Invitation" to preview your invitation card
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
