import { createElement } from "react";
import {
  Landmark, GraduationCap, Banknote, TrainFront, ShieldCheck, BookOpen,
  University, ScrollText, Globe, FileText, Briefcase, Award, FolderOpen,
} from "lucide-react";

const map = {
  Landmark, GraduationCap, Banknote, TrainFront, ShieldCheck, BookOpen,
  University, ScrollText, Globe, FileText, Briefcase, Award,
};

// <CategoryIcon name="Landmark" size={24} />
export function CategoryIcon({ name, size = 22 }) {
  return createElement(map[name] || FolderOpen, { size });
}
