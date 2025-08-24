'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle, 
  Microscope, 
  FlaskConical, 
  Cpu, 
  Zap,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const laboratories = [
  {
    id: 'chemistry-research',
    name: 'Advanced Chemistry Research Lab',
    description: 'State-of-the-art chemistry laboratory equipped with modern analytical instruments and safety systems.',
    image: '/placeholder-lab-chemistry.jpg',
    capacity: '24 researchers',
    area: '800 sq ft',
    safetyLevel: 'BSL-2',
    equipment: ['HPLC Systems', 'Mass Spectrometer', 'NMR', 'Fume Hoods', 'Analytical Balances'],
    certifications: ['ISO 17025', 'Good Laboratory Practice'],
    features: [
      'Climate-controlled environment',
      'Emergency safety systems',
      'Waste management protocols',
      'Digital data logging'
    ]
  },
  {
    id: 'biology-molecular',
    name: 'Molecular Biology Laboratory',
    description: 'Specialized facility for DNA/RNA analysis, protein studies, and cell culture research.',
    image: '/placeholder-lab-biology.jpg',
    capacity: '16 researchers',
    area: '600 sq ft',
    safetyLevel: 'BSL-3',
    equipment: ['PCR Machines', 'Gel Electrophoresis', 'Centrifuges', 'Incubators', 'Biosafety Cabinets'],
    certifications: ['Biosafety Level 3', 'Research Ethics Approval'],
    features: [
      'Sterile work environments',
      'Temperature monitoring',
      'Contamination prevention',
      'Sample storage systems'
    ]
  },
  {
    id: 'physics-optics',
    name: 'Optics & Photonics Lab',
    description: 'Advanced facility for laser research, optical measurements, and photonic device development.',
    image: '/placeholder-lab-physics.jpg',
    capacity: '12 researchers',
    area: '500 sq ft',
    safetyLevel: 'Laser Safety Class 4',
    equipment: ['Laser Systems', 'Spectrometers', 'Optical Tables', 'Interferometers', 'Photodetectors'],
    certifications: ['Laser Safety Certification', 'Optical Standards Compliance'],
    features: [
      'Vibration isolation',
      'Laser safety protocols',
      'Precision measurements',
      'Clean room sections'
    ]
  },
  {
    id: 'materials-testing',
    name: 'Materials Testing Laboratory',
    description: 'Comprehensive facility for mechanical, thermal, and structural analysis of materials.',
    image: '/placeholder-lab-materials.jpg',
    capacity: '20 researchers',
    area: '1000 sq ft',
    safetyLevel: 'Industrial Safety',
    equipment: ['Universal Testing Machine', 'Hardness Testers', 'Thermal Analyzers', 'Microscopes'],
    certifications: ['ASTM Standards', 'ISO 9001'],
    features: [
      'Heavy equipment foundations',
      'Environmental chambers',
      'Non-destructive testing',
      'Quality control systems'
    ]
  }
];

const services = [
  {
    title: 'Equipment Calibration',
    description: 'Professional calibration services for all laboratory instruments',
    icon: Award
  },
  {
    title: 'Safety Training',
    description: 'Comprehensive safety training programs for laboratory personnel',
    icon: Shield
  },
  {
    title: 'Maintenance Support',
    description: '24/7 technical support and preventive maintenance services',
    icon: CheckCircle
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored laboratory setups for specific research requirements',
    icon: Building2
  }
];

export default function LaboratoriesPage() {
  const t = useTranslations('laboratories');
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Laboratory Facilities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              World-class laboratory facilities equipped with cutting-edge technology and maintained to the highest safety and quality standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/en/contact">
                  Schedule a Tour
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Laboratory Facilities */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Laboratory Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our state-of-the-art laboratories designed for research excellence and educational innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {laboratories.map((lab, index) => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                      <Image
                        src={lab.image}
                        alt={lab.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-blue-600">
                        {lab.safetyLevel}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{lab.name}</CardTitle>
                    <CardDescription className="text-base">
                      {lab.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{lab.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-600" />
                        <span>{lab.area}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Equipment:</h4>
                      <div className="flex flex-wrap gap-1">
                        {lab.equipment.slice(0, 3).map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {lab.equipment.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{lab.equipment.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Certifications:</h4>
                      <div className="flex flex-wrap gap-1">
                        {lab.certifications.map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {lab.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-3 w-3 mr-2 text-green-500 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/en/contact?lab=${lab.id}`}>
                        Request Access
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Laboratory Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support services to ensure optimal laboratory operations and research outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Access Our Facilities?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Contact our laboratory management team to discuss access requirements, 
              training programs, and collaborative research opportunities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Laboratory Access</h3>
                <p className="text-blue-100">+237 677 181 487</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Operating Hours</h3>
                <p className="text-blue-100">Mon-Fri: 8AM-6PM</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-blue-100">Simbock, Yaoundé</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/en/contact">
                  Schedule Visit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Request Information
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
