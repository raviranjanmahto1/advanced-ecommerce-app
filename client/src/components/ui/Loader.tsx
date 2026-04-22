'use client';

import { motion } from 'framer-motion';

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-r-2 border-secondary"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-b-2 border-accent-foreground opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      </div>
      <motion.p 
        className="text-muted-foreground font-medium tracking-widest text-sm uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
}
