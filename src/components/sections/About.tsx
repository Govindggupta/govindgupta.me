import * as motion from "framer-motion/client"

import { Markdown } from "@/components/ui/Markdown"
import aboutContent from "@/data/about"

export async function About() {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6 flex items-start justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              About
            </h2>
          </div>
        </div>

        <Markdown source={aboutContent} />
      </motion.div>
    </section>
  )
}
