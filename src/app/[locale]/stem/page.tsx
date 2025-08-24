'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Award, 
  BookOpen, 
  Microscope, 
  Calculator,
  Cpu,
  Beaker,
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';


const stemPrograms = [
  {
    id: 'robotics-engineering',
    title: 'Robotics & Engineering',
    description: 'Hands-on robotics programming and mechanical engineering fundamentals for future innovators.',
    duration: '12 weeks',
    ageGroup: '12-18 years',
    level: 'Beginner to Advanced',
    icon: Cpu,
    color: 'bg-blue-500',
    features: ['Arduino Programming', 'Mechanical Design', '3D Printing', 'Sensor Integration'],
    outcomes: ['Build functional robots', 'Learn programming basics', 'Understand engineering principles']
  },
  {
    id: 'chemistry-lab',
    title: 'Chemistry Laboratory',
    description: 'Explore chemical reactions, molecular structures, and laboratory techniques in a safe environment.',
    duration: '10 weeks',
    ageGroup: '14-18 years',
    level: 'Intermediate',
    icon: Beaker,
    color: 'bg-green-500',
    features: ['Organic Chemistry', 'Lab Safety', 'Analytical Methods', 'Research Projects'],
    outcomes: ['Master lab techniques', 'Understand chemical principles', 'Conduct independent research']
  },
  {
    id: 'physics-exploration',
    title: 'Physics Exploration',
    description: 'Discover the fundamental laws of physics through interactive experiments and real-world applications.',
    duration: '8 weeks',
    ageGroup: '13-17 years',
    level: 'Beginner',
    icon: Zap,
    color: 'bg-yellow-500',
    features: ['Mechanics', 'Electricity & Magnetism', 'Optics', 'Modern Physics'],
    outcomes: ['Understand physical laws', 'Develop analytical thinking', 'Apply physics concepts']
  },
  {
    id: 'biology-research',
    title: 'Biology Research Methods',
    description: 'Learn modern biological research techniques including microscopy, DNA analysis, and cell culture.',
    duration: '14 weeks',
    ageGroup: '15-18 years',
    level: 'Advanced',
    icon: Microscope,
    color: 'bg-purple-500',
    features: ['Microscopy', 'DNA Extraction', 'Cell Culture', 'Data Analysis'],
    outcomes: ['Master research methods', 'Understand life sciences', 'Prepare for university']
  },
  {
    id: 'mathematics-modeling',
    title: 'Mathematical Modeling',
    description: 'Apply advanced mathematics to solve real-world problems using computational tools and statistical analysis.',
    duration: '10 weeks',
    ageGroup: '16-18 years',
    level: 'Advanced',
    icon: Calculator,
    color: 'bg-red-500',
    features: ['Statistical Analysis', 'Computer Modeling', 'Data Visualization', 'Problem Solving'],
    outcomes: ['Develop analytical skills', 'Learn modeling techniques', 'Apply mathematics practically']
  },
  {
    id: 'environmental-science',
    title: 'Environmental Science',
    description: 'Study environmental systems, sustainability, and conservation through field work and laboratory analysis.',
    duration: '12 weeks',
    ageGroup: '13-18 years',
    level: 'Intermediate',
    icon: BookOpen,
    color: 'bg-emerald-500',
    features: ['Field Studies', 'Water Testing', 'Ecosystem Analysis', 'Sustainability Projects'],
    outcomes: ['Understand environmental issues', 'Learn conservation methods', 'Develop eco-consciousness']
  }
];

const stats = [
  { label: 'Students Enrolled', value: '2,500+', icon: Users },
  { label: 'Programs Offered', value: '20+', icon: GraduationCap },
  { label: 'Success Rate', value: '95%', icon: Award },
  { label: 'Years Experience', value: '10+', icon: Clock }
];

export default function STEMPage() {
  const t = useTranslations('stem');

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
              STEM Programs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Inspiring the next generation of scientists, technologists, engineers, and mathematicians through hands-on learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/en/contact">
                  Enroll Now
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

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our STEM Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of STEM programs designed to build critical thinking, 
              problem-solving skills, and prepare students for future careers in science and technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stemPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center`}>
                        <program.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <Badge variant="outline">{program.level}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Duration:</span>
                        <p className="text-gray-600">{program.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Age Group:</span>
                        <p className="text-gray-600">{program.ageGroup}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900 block mb-2">Key Features:</span>
                      <div className="flex flex-wrap gap-1">
                        {program.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-900 block mb-2">Learning Outcomes:</span>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {program.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/en/contact?program=${program.id}`}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our STEM Programs?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our programs are designed by education experts and industry professionals to provide 
              the most relevant and engaging STEM education experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Expert Instructors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Learn from qualified educators and industry professionals with years of experience 
                    in their respective STEM fields.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Microscope className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Modern Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access state-of-the-art laboratory equipment and technology to enhance your 
                    learning experience and practical skills.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive recognized certificates upon completion that can enhance your academic 
                    profile and university applications.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your STEM Journey?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of students who have already discovered their passion for science, 
              technology, engineering, and mathematics through our comprehensive programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/en/contact">
                  Enroll Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Schedule a Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
