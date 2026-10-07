import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Baby,
  Bath,
  Briefcase,
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  Clock,
  Disc3,
  Expand,
  Flower2,
  Gem,
  GraduationCap,
  Handshake,
  Heart,
  LayoutGrid,
  Leaf,
  Mail,
  MapPin,
  Martini,
  Menu,
  Music,
  Navigation,
  PartyPopper,
  Phone,
  Play,
  Plus,
  Quote,
  Send,
  ShieldCheck,
  Snowflake,
  Sparkles,
  SquareParking,
  Star,
  TreePalm,
  UserRound,
  Users,
  Wine,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode, SVGProps } from 'react'

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string
  strokeWidth?: number | string
  absoluteStrokeWidth?: boolean
}

function brandIcon(path: ReactNode, displayName: string) {
  function BrandIcon({ size = 24, strokeWidth: _sw, absoluteStrokeWidth: _asw, ...props }: BrandIconProps) {
    void _sw
    void _asw
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        {path}
      </svg>
    )
  }
  BrandIcon.displayName = displayName
  return BrandIcon
}

const WhatsApp = brandIcon(
  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 1 1 6.99 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-1.99-1.23 7.46 7.46 0 0 1-1.37-1.71c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />,
  'WhatsApp',
)

const Instagram = brandIcon(
  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />,
  'Instagram',
)

const Facebook = brandIcon(
  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07Z" />,
  'Facebook',
)

const icons = {
  accessibility: Accessibility,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  armchair: Armchair,
  baby: Baby,
  bath: Bath,
  briefcase: Briefcase,
  calendar: CalendarCheck,
  camera: Camera,
  check: Check,
  chevronDown: ChevronDown,
  clock: Clock,
  disc: Disc3,
  expand: Expand,
  flower: Flower2,
  gem: Gem,
  graduation: GraduationCap,
  handshake: Handshake,
  heart: Heart,
  layout: LayoutGrid,
  leaf: Leaf,
  mail: Mail,
  mapPin: MapPin,
  martini: Martini,
  menu: Menu,
  music: Music,
  navigation: Navigation,
  party: PartyPopper,
  phone: Phone,
  play: Play,
  plus: Plus,
  quote: Quote,
  send: Send,
  shield: ShieldCheck,
  snowflake: Snowflake,
  sparkles: Sparkles,
  parking: SquareParking,
  star: Star,
  palm: TreePalm,
  user: UserRound,
  users: Users,
  wine: Wine,
  x: X,
  zap: Zap,
  whatsapp: WhatsApp,
  instagram: Instagram,
  facebook: Facebook,
} satisfies Record<string, LucideIcon | ReturnType<typeof brandIcon>>

export type IconName = keyof typeof icons

type IconProps = { name: IconName; size?: number; className?: string; strokeWidth?: number }

export function Icon({ name, size = 22, className, strokeWidth = 1.6 }: IconProps) {
  const Component = icons[name]
  return <Component size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
