import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchParamsHandler() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());
    const { utm_source, utm_medium } = params

    useEffect(() => {

        if (utm_source || utm_medium) {
            console.log("UTM Params:", { utm_source, utm_medium })

            const current = new URLSearchParams(Array.from(searchParams.entries()));
            current.delete('utm_source');
            current.delete('utm_medium');
            const search = current.toString();
            const query = search ? `?${search}` : "";
            router.replace(`${pathname}${query}`);
        }

    }, [searchParams, router, pathname])

    return null

}