"use client";

export default function LocationSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#475F84]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-12">
          Location & Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="w-full h-96 bg-secondary/50 rounded overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.8118669116084!2d6.796708499999999!3d52.264961299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b811e4643314cf%3A0x4cfe654c9e986134!2sDrienerstraat%2025%2C%207551%20HK%20Hengelo%2C%20Netherlands!5e0!3m2!1sen!2sbd!4v1763014712484!5m2!1sen!2sbd"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-accent mb-2">Address</h3>
              <p className="text-foreground/80">
                Drienerstraat 25,
                <br />
                7551 HK Hengelo,
                <br />
                Overijssel, Nederland
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-accent mb-2">Hours</h3>
              <p className="text-foreground/80">
                Tuesday - Thursday: 5:00 PM - 11:00 PM
                <br />
                Friday - Saturday: 5:00 PM - 12:00 AM
                <br />
                Sunday: 5:00 PM - 10:00 PM
                <br />
                Monday: Closed
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-accent mb-2">Contact</h3>
              <p className="text-foreground/80">
                Phone: (555) 123-4567
                <br />
                Email: info@aromaamoris.com
              </p>
            </div>

            <button className="px-8 py-3 bg-accent text-accent-foreground font-bold rounded hover:bg-accent/90 transition-colors">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
