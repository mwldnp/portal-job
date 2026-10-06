import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Portal Job" />
            <nav>
                <div>
                    Logo
                </div>
                <Button>Login</Button>
            </nav>
            <section className='grid grid-cols-2'>

            </section>
        </>
    );
}
