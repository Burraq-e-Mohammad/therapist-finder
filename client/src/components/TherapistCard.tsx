import { MapPin, Clock, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Therapist } from "@/services/api";

interface TherapistCardProps {
  therapist: Therapist;
  onViewDetails: (therapist: Therapist) => void;
}

export const TherapistCard = ({
  therapist,
  onViewDetails,
}: TherapistCardProps) => {
  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-hover hover:-translate-y-1 border-border bg-gradient-card">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 ring-2 ring-primary/20">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-fast">
              {therapist.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {therapist.expertise.length > 0 ? therapist.expertise[0] : 'Mental Health Professional'}
            </p>
            {/* Experience */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {therapist.experienceYears} years experience
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{therapist.city}</span>
          </div>
          {therapist.fees && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-4 h-4 text-success shrink-0 leading-none">Rs.</span>
              <span className="font-medium text-foreground">
                Rs. {therapist.fees.toLocaleString()} per session
              </span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {therapist.modes.includes('In-person') && (
            <Badge variant="secondary" className="text-xs">
              In-person
            </Badge>
          )}
          {therapist.modes.some(mode => mode.includes('Virtual') || mode.includes('Online')) && (
            <Badge variant="outline" className="text-xs">
              Online
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={() => onViewDetails(therapist)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
