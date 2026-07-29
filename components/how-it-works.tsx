export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Create a goal',
      description: 'AI detects the type and builds a smart breakdown'
    },
    {
      number: '2',
      title: 'See today&apos;s tasks',
      description: 'One clear list, smart-sorted, always visible'
    },
    {
      number: '3',
      title: 'Do the work in real life',
      description: 'Take action on what matters to you'
    },
    {
      number: '4',
      title: 'Come back, mark it done',
      description: 'Celebrate progress, build your streak'
    }
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6 md:gap-4">
      {steps.map((step, index) => (
        <div key={index} className="space-y-4">
          {/* Step Number */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20">
            <span className="font-mono text-xl font-bold text-primary">
              {step.number}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Connector line (except last item) */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute left-full top-7 w-4 h-0.5 bg-border/30" />
          )}
        </div>
      ))}
    </div>
  )
}
