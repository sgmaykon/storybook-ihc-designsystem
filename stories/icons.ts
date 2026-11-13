/**
 * Registro de ícones.
 *
 * - `material/*`: Google Material Symbols Rounded (wght 300, FILL 0, GRAD 0),
 *   exatamente como no catálogo "Ajudivas / Catálogo de ícones" do Figma.
 *   Licença Apache 2.0.
 * - `lucide/*`: cópias dos 10 ícones originais da Home (Lucide). Licença ISC.
 *
 * Os arquivos são consumidos como máscara CSS (`mask-image`), então qualquer
 * ícone herda a cor do texto via `currentColor`.
 */

const materialFiles = import.meta.glob('./assets/icons/material/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const lucideFiles = import.meta.glob('./assets/icons/lucide/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const fileName = (path: string) => path.split('/').pop()!.replace('.svg', '');

function toRegistry(files: Record<string, string>, prefix: string) {
  return Object.fromEntries(
    Object.entries(files).map(([path, url]) => [`${prefix}/${fileName(path)}`, url]),
  ) as Record<string, string>;
}

export const ICONS: Record<string, string> = {
  ...toRegistry(materialFiles, 'material'),
  ...toRegistry(lucideFiles, 'lucide'),
};

export type IconName = keyof typeof ICONS;

export interface IconGroup {
  id: string;
  label: string;
  description: string;
  icons: IconName[];
}

/** Grupos do catálogo do Figma (página "Icons", node 1010:15). */
export const iconGroups: IconGroup[] = [
  {
    id: 'mapa',
    label: 'Mapa e rotas',
    description: 'Localização, trajetos e orientação',
    icons: [
      'material/home',
      'material/search',
      'material/map',
      'material/explore',
      'material/route',
      'material/directions-walk',
      'material/near-me',
      'material/my-location',
      'material/location-on',
      'material/navigation',
      'material/alt-route',
      'material/flag',
    ],
  },
  {
    id: 'seguranca',
    label: 'Segurança e emergência',
    description: 'Alertas, proteção e contatos de emergência',
    icons: [
      'material/warning',
      'material/report',
      'material/emergency',
      'material/sos',
      'material/call',
      'material/local-police',
      'material/health-and-safety',
      'material/shield',
      'material/verified-user',
      'material/notifications-active',
      'material/campaign',
      'material/dangerous',
    ],
  },
  {
    id: 'acessibilidade',
    label: 'Acessibilidade e controles',
    description: 'Inclusão, leitura e ajustes do mapa',
    icons: [
      'material/accessibility-new',
      'material/accessible',
      'material/accessible-forward',
      'material/add',
      'material/remove',
      'material/zoom-in',
      'material/zoom-out',
      'material/volume-up',
      'material/hearing',
      'material/visibility',
      'material/contrast',
      'material/text-increase',
    ],
  },
  {
    id: 'iluminacao',
    label: 'Iluminação e ambiente',
    description: 'Condições da rua, iluminação e espaços públicos',
    icons: [
      'material/lightbulb',
      'material/light-mode',
      'material/dark-mode',
      'material/park',
      'material/forest',
      'material/streetview',
      'material/nightlight',
      'material/wb-twilight',
      'material/traffic',
      'material/directions',
    ],
  },
  {
    id: 'comunidade',
    label: 'Comunidade e apoio',
    description: 'Conversas, redes de confiança e acolhimento',
    icons: [
      'material/chat-bubble',
      'material/forum',
      'material/chat',
      'material/comment',
      'material/groups',
      'material/group',
      'material/person-add',
      'material/support-agent',
      'material/favorite',
      'material/thumb-up',
      'material/share',
      'material/diversity-3',
    ],
  },
  {
    id: 'relatos',
    label: 'Relatos e mídia',
    description: 'Registrar experiências, avaliar locais e enviar evidências',
    icons: [
      'material/photo-camera',
      'material/add-a-photo',
      'material/image',
      'material/photo-library',
      'material/videocam',
      'material/mic',
      'material/description',
      'material/edit-note',
      'material/star',
      'material/rate-review',
      'material/send',
      'material/attach-file',
    ],
  },
  {
    id: 'perfil',
    label: 'Perfil e privacidade',
    description: 'Conta, dados pessoais e segurança de acesso',
    icons: [
      'material/person',
      'material/account-circle',
      'material/settings',
      'material/tune',
      'material/manage-accounts',
      'material/contact-emergency',
      'material/lock',
      'material/lock-person',
      'material/visibility-off',
      'material/security',
      'material/verified',
      'material/fingerprint',
    ],
  },
  {
    id: 'navegacao',
    label: 'Navegação e ações',
    description: 'Comandos essenciais da interface',
    icons: [
      'material/arrow-back',
      'material/arrow-forward',
      'material/close',
      'material/check',
      'material/more-vert',
      'material/menu',
      'material/expand-more',
      'material/expand-less',
      'material/refresh',
      'material/info',
      'material/help',
      'material/logout',
    ],
  },
  {
    id: 'home',
    label: 'Originais da Home',
    description: 'Ícones usados na Home com a geometria original (Lucide)',
    icons: [
      'lucide/search',
      'lucide/house',
      'lucide/settings',
      'lucide/shield-check',
      'lucide/map-pin',
      'lucide/accessibility',
      'lucide/plus',
      'lucide/minus',
      'lucide/message-square',
      'lucide/triangle-alert',
      'lucide/x',
      'lucide/circle-x',
      'lucide/lightbulb-off',
      'lucide/sprout',
    ],
  },
];

/** Nome exibido: "material/near-me" → "near_me". */
export function iconLabel(name: IconName): string {
  return name.split('/')[1].replace(/-/g, '_');
}
