export function ProblemCards() {
  const problems = [
    {
      title: 'Goals get buried',
      description: 'Forgotten in apps and papers, rarely reaching daily awareness'
    },
    {
      title: 'One missed day becomes zero days',
      description: 'Streak apps shame you into quitting'
    },
    {
      title: 'No supportive system',
      description: 'People have ambition but lack clarity and structure, not motivation'
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {problems.map((problem, index) => (
        <div
          key={index}
          className="bg-card rounded-3xl p-8 border border-border/50 hover:border-border transition"
        >
          <h3 className="font-serif text-2xl mb-3 text-primary">
            {problem.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {problem.description}
          </p>
        </div>
      ))}
    </div>
  )
}
