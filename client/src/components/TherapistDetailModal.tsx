import { MapPin, Phone, Mail, User, Star, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Therapist } from "@/services/api";

interface TherapistDetailModalProps {
  therapist: Therapist | null;
  open: boolean;
  onClose: () => void;
}

export const TherapistDetailModal = ({
  therapist,
  open,
  onClose,
}: TherapistDetailModalProps) => {
  if (!therapist) return null;

  const handleCall = () => {
    window.location.href = `tel:${therapist.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${therapist.email}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Section */}
        <DialogHeader className="p-6 pb-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 ring-4 ring-primary/20">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">
                {therapist.name}
              </DialogTitle>
              <p className="text-muted-foreground">
                {therapist.gender} • {therapist.experienceYears} years experience
              </p>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{therapist.city}</span>
            </div>
            {typeof therapist.fees === 'number' && (
              <div className="flex items-center gap-2">
                <span className="text-success text-sm font-medium">Rs.</span>
                <span className="text-sm font-medium">
                  {therapist.fees.toLocaleString()} per session
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              {therapist.phone ? (
                <a href={`tel:${therapist.phone}`} className="text-sm hover:text-primary transition-fast">
                  {therapist.phone}
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">Not provided</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary shrink-0" />
              {therapist.email ? (
                <a href={`mailto:${therapist.email}`} className="text-sm hover:text-primary transition-fast truncate">
                  {therapist.email}
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">Not provided</span>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Content Tabs */}
        <div className="p-6">
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="consultation">Modes</TabsTrigger>
            </TabsList>

            <TabsContent value="education" className="space-y-3">
              {therapist.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-accent/30 rounded-lg border border-border/50"
                >
                  <p className="text-sm">{edu}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="experience" className="space-y-3">
              {therapist.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-accent/30 rounded-lg border border-border/50"
                >
                  <p className="text-sm">{exp}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="expertise">
              <div className="flex flex-wrap gap-2">
                {therapist.expertise.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-2 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {therapist.about}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="consultation" className="space-y-4">
              <div className="space-y-3">
                {therapist.modes.includes('In-person') && (
                  <div className="flex items-start gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">In-person consultations</p>
                      <p className="text-sm text-muted-foreground">
                        Available at clinic location
                      </p>
                    </div>
                  </div>
                )}
                {therapist.modes.some(mode => mode.includes('Virtual') || mode.includes('Online')) && (
                  <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Online sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Via secure video call platform
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ✅ Flexible scheduling including weekends
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="p-6 pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCall}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button
            onClick={handleEmail}
            variant="outline"
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
