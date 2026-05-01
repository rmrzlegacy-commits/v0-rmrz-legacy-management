import { FileText, UserCheck, Bell, Home } from "lucide-react"

const steps = [
  { icon: FileText, title: "Submit", desc: "Fill out form" },
  { icon: UserCheck, title: "Screen", desc: "Background check" },
  { icon: Bell, title: "Approval", desc: "24-48 hours" },
  { icon: Home, title: "Move In", desc: "Get address" },
]

export function ScreeningProcess() {
  return (
    <section id="screening" className="px-6 py-10 bg-background">
      <h2 className="font-serif text-xl font-bold text-foreground text-center mb-2">
        Simple Screening Process
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Property address provided after approved screening
      </p>

      <div className="flex justify-between max-w-sm mx-auto">
        {steps.map((item, index) => (
          <div key={item.title} className="flex flex-col items-center flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-2">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-full w-full h-px bg-border/50 -translate-y-1/2" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
