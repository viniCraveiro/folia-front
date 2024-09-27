class localStorageService {
    static setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    static getItem<T>(key: string): T | null {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? (JSON.parse(serializedValue) as T) : null;
        } catch (error) {
            console.error(`Error getting ${key} from localStorage:`, error);
            return null;
        }
    }

    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
        }
    }
}
