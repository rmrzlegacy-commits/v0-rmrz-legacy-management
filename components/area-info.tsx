import { ShoppingBag, Mountain, Sparkles, Plane, Clock } from "lucide-react"

const nearby = [
  { icon: Sparkles, name: "Las Vegas Strip", time: "10-15 min" },
  { icon: ShoppingBag, name: "Downtown Summerlin", time: "5 min" },
  { icon: Mountain, name: "Red Rock Canyon", time: "15 min" },
  { icon: Plane, name: "Harry Reid Airport", time: "25 min" },
]

export function AreaInfo() {
  return (
    <section id="area" className="px-6 py-10 bg-background">
      <div className="text-center mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">
          Quiet Neighborhood, Close to Everything
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Set in a calm, quiet neighborhood in the Summerlin - Lone Mountain area, yet conveniently close when you want the action.
        </p>
      </div>

      <div className="flex flex-col gap-2 max-w-sm mx-auto">
        {nearby.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between bg-card border border-border/50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
