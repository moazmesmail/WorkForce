import { useTranslation } from 'react-i18next';

export function useMockTranslation() {
    const { t } = useTranslation();

    const tCity = (city: string): string => {
        if (!city) return '';
        return t(`mock.cities.${city}`, city);
    };

    const tNationality = (nat: string): string => {
        if (!nat) return '';
        return t(`mock.nationalities.${nat}`, nat);
    };

    const tGender = (gen: string): string => {
        if (!gen) return '';
        return t(`mock.genders.${gen}`, gen);
    };

    const tEmpStatus = (status: string): string => {
        if (!status) return '';
        return t(`mock.employmentStatuses.${status}`, status);
    };

    const tSponsStatus = (status: string): string => {
        if (!status) return '';
        return t(`mock.sponsorshipStatuses.${status}`, status);
    };

    const tDocName = (name: string): string => {
        if (!name) return '';
        return t(`mock.documentNames.${name}`, name);
    };

    const tName = (name: string): string => {
        if (!name) return '';
        return t(`mock.names.${name}`, name);
    };

    const tDesc = (desc: string): string => {
        if (!desc) return '';
        return t(`mock.descriptions.${desc}`, desc);
    };

    const tJobTitle = (title: string): string => {
        if (!title) return '';
        const key = title.charAt(0).toLowerCase() + title.slice(1).replace(/ /g, '');
        return t(`jobTitles.${key}`, title);
    };

    return {
        tCity,
        tNationality,
        tGender,
        tEmpStatus,
        tSponsStatus,
        tDocName,
        tName,
        tDesc,
        tJobTitle,
    };
}
