

export const removeItem = (item: string) => {
    let localContracts;

    typeof window !== 'undefined' ? localContracts = JSON.parse(localStorage.getItem(item) as any) : null;

    if (localContracts) {
        localStorage.removeItem(item);
    }
}
