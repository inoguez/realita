import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from '@/components/animate-ui/components/animate/cursor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { desc } from 'drizzle-orm';
import { Building2, UsersRound, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Devices from '@/assets/Devices.png';

const features = [
  {
    name: 'Gestión de Propiedades',
    description:
      'Registra y administra tus propiedades con facilidad, incluyendo fotos, metadatos y disponibilidad.',
    icon: Building2,
    iconColor: 'text-electric-blue',
    href: '/',
  },
  {
    name: 'Administración de Inquilinos',
    description:
      'Mantén un registro detallado de tus inquilinos, sus contratos y comunicaciones.',
    iconColor: 'text-future-purple',

    icon: UsersRound,
    href: '/',
  },
  {
    name: 'Control de Pagos',
    href: '/',
    icon: WalletCards,
    iconColor: 'text-orange-heat',

    description:
      'Realiza un seguimiento de los pagos de alquiler, genera facturas y envía recordatorios automáticos a los inquilinos.',
  },
];

export default function HomePage() {
  return (
    <main className='flex flex-col gap-20'>
      <section className='relative flex flex-col items-start justify-center gap-6 w-2/3 text-left text-balance min-h-[700px]'>
        <h1 className='text-7xl md:text-8xl font-semibold'>
          Gestiona tus propiedades de forma inteligente
        </h1>
        <h2>
          Todo lo que necesitas saber en un solo lugar. Administra propiedades,
          pagos, y relaciones con clientes en una plataforma unificada y
          vanguardista.
        </h2>
        <Button size='xl' asChild className='rounded-full '>
          <Link href='/sign-up'>Probar ahora</Link>
        </Button>
      </section>

      <section className='grid md:grid-cols-2  lg:grid-cols-3 gap-6'>
        {features?.map((feature) => (
          <Card key={feature.name} className='p-6 rounded-3xl text-balance'>
            <CardHeader>
              {feature.icon && (
                <feature.icon size={68} className={cn(feature.iconColor)} />
              )}
            </CardHeader>
            <CardTitle>{feature.name}</CardTitle>
            <CardDescription className='flex-1'>
              {feature.description || 'Descripción próximamente...'}
            </CardDescription>
            <CardAction>
              <Link href={feature.href} className='text-electric-blue'>
                Ver más
              </Link>
            </CardAction>

            <CursorProvider global={false}>
              <Cursor />
              <CursorFollow>{feature.name}</CursorFollow>
            </CursorProvider>
          </Card>
        ))}
      </section>

      <section className='grid grid-cols-[1fr]'>
        <Image src={Devices} alt='MacBook' />
      </section>

      <section className='min-h-[300px] flex flex-col gap-4 items-center justify-center  text-center text-balance'>
        <h2 className='text-4xl font-semibold text-center'>
          Comienza a gestionar tus propiedades hoy mismo
        </h2>
        <div className='flex justify-center'>
          <Button size='xl' asChild className='rounded-full '>
            <Link href='/sign-up'>Probar ahora</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
