'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign } from 'lucide-react';
import type { StemProgram } from '@/types';

interface ProgramCardProps {
  program: StemProgram;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const availableSpots = program.capacity - program.enrolled;
  const isFullyBooked = availableSpots <= 0;

  return (
    <Card className="group overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="line-clamp-2">{program.title}</CardTitle>
            <Badge variant="outline">{program.ageGroup}</Badge>
          </div>
          {program.featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>
        <CardDescription className="line-clamp-3">
          {program.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{program.enrolled}/{program.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${program.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isFullyBooked ? "destructive" : "default"}
              className="text-xs"
            >
              {isFullyBooked ? "Full" : `${availableSpots} spots`}
            </Badge>
          </div>
        </div>

        {program.schedule && program.schedule.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Schedule:</span>
            <div className="space-y-1">
              {program.schedule.slice(0, 2).map((schedule, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  {schedule.day}: {schedule.startTime} - {schedule.endTime}
                </div>
              ))}
              {program.schedule.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{program.schedule.length - 2} more sessions
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/stem/${program.id}`}>Learn More</Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            disabled={isFullyBooked}
          >
            {isFullyBooked ? "Full" : "Register"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
