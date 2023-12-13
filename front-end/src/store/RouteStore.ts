import { defineStore } from 'pinia';

type RootState = {
    redirectUrl: string | null;
};

export const useRouteStore = defineStore('route', {
    state: (): RootState => ({
        redirectUrl: null,
    }),
    actions: {
        setRedirectUrl(redirectUrl: string): void {
            this.redirectUrl = redirectUrl;
        },
        deleteRedirectUrl(): void {
            this.redirectUrl = null;
        },
    },
});
