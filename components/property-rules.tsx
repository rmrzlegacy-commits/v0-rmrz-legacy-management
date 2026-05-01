import { AlertTriangle, Ban } from "lucide-react"

export function PropertyRules() {
  return (
    <section id="rules" className="px-6 py-10 bg-card">
      <div className="max-w-md mx-auto">
        <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              House Rules
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-400" />
              <span className="text-base font-bold text-red-400">No Pets</span>
            </div>
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-400" />
              <span className="text-base font-bold text-red-400">No Parties</span>
            </div>
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-400" />
              <span className="text-base font-bold text-red-400">No Smoking</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            The courtyard is shared with a detached unit while maintaining a respectful and private environment.
          </p>
        </div>
      </div>
    </section>
  )
}
