import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Home, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-primary mb-6">About DreamHomes</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're passionate about helping people find their perfect home. With over a decade of experience in real
                estate, we've built a reputation for excellence, integrity, and personalized service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  To make the process of buying, selling, and renting properties as smooth and stress-free as possible.
                  We believe everyone deserves to find their dream home, and we're here to make that happen.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our team of experienced professionals is dedicated to providing exceptional service, market expertise,
                  and personalized attention to every client.
                </p>
              </div>
              <div className="bg-primary/5 rounded-2xl p-8">
                <img src="/professional-real-estate-team-meeting.jpg" alt="Our team" className="w-full h-64 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
                  <p className="text-muted-foreground">Happy Clients</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">1000+</h3>
                  <p className="text-muted-foreground">Properties Sold</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
                  <p className="text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">98%</h3>
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our relationships with clients.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Integrity</h3>
                  <p className="text-muted-foreground">
                    We believe in honest, transparent communication and ethical business practices in every transaction.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for excellence in every aspect of our service, from initial consultation to closing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We embrace technology and innovative approaches to make real estate transactions smoother.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
