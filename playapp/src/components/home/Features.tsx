export default function FeatureSection() {
  const features = [
    {
      icon: '👍',
      title: 'Puntúa tu playa favorita',
      description: 'Ayudá a otras personas a conocer la playa que más te gusta',
    },
    {
      icon: '📍',
      title: 'Todas las playas en un solo lugar',
      description: 'Con todas sus características',
    },
    {
      icon: '🛠️',
      title: 'Ayuda a mejorar tu playa',
      description: 'Generá conciencia de mejoras necesarias',
    },
    {
      icon: '🛟',
      title: 'Playas seguras',
      description: 'Encontrá las playas más seguras para tu familia',
    },
  ]

  return (
    <section className="bg-white py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
