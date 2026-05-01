"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredUnit: "",
    moveInDate: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          unit: formData.preferredUnit,
          moveIn: formData.moveInDate,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      setIsSubmitted(true)
    } catch {
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="px-6 py-12 bg-background">
        <div className="max-w-md mx-auto text-center bg-card border border-primary/30 rounded-xl p-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
            Request Submitted
          </h3>
          <p className="text-sm text-muted-foreground">
            Approved applicants will receive property details.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="px-6 py-12 bg-background">
      <h2 className="font-serif text-xl font-bold text-foreground text-center mb-6">
        Request Screening
      </h2>

      <div className="max-w-md mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-xl p-5 space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm text-foreground">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
              className="mt-1 bg-input border-border/50 h-11"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="mt-1 bg-input border-border/50 h-11"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm text-foreground">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="mt-1 bg-input border-border/50 h-11"
            />
          </div>

          <div>
            <Label htmlFor="preferredUnit" className="text-sm text-foreground">Preferred Unit</Label>
            <Select
              value={formData.preferredUnit}
              onValueChange={(value) => handleChange("preferredUnit", value)}
            >
              <SelectTrigger className="mt-1 bg-input border-border/50 h-11">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment - $2,100/mo</SelectItem>
                <SelectItem value="casita">Casita - $1,300/mo</SelectItem>
                <SelectItem value="either">Either unit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="moveInDate" className="text-sm text-foreground">Move-In Date</Label>
            <Input
              id="moveInDate"
              type="date"
              value={formData.moveInDate}
              onChange={(e) => handleChange("moveInDate", e.target.value)}
              className="mt-1 bg-input border-border/50 h-11"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm text-foreground">Message (optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={3}
              className="mt-1 bg-input border-border/50 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-medium"
          >
            {isSubmitting ? "Submitting..." : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
