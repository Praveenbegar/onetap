import resources from "../data/resources";

export function searchResources(query) {

    if (!query.trim()) return [];

    const keyword = query.toLowerCase();

    return resources.filter((resource) => {

        return (
            resource.title.toLowerCase().includes(keyword) ||
            resource.description.toLowerCase().includes(keyword) ||
            resource.category.toLowerCase().includes(keyword)
        );

    });

}