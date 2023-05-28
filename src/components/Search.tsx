import { GEO_API_OPTIONS, GEO_API_URL } from "@/constants/API";
import City from "@/types/City";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

export default function Search({handleSearchChange}: {handleSearchChange: CallableFunction}) {

    const [search, setSearch] = useState("");

    const handleOnChange = (data: any) => {
        setSearch(data);
        handleSearchChange(data);
    }

    const handleLoadOptions = (input: string) => {
        return (
            fetch(`${GEO_API_URL}/cities?namePrefix=${input}&?minPopulation=1000000`, GEO_API_OPTIONS)
                .then((res) => res.json())
                .then((res) => {
                    if (res.message) {
                        return (
                            {
                                options: []
                            }
                        )
                    }
                    return {
                        options: res.data.map((city: City) => {
                                return {
                                    value: {
                                        latitude: city.latitude,
                                        longitude: city.longitude
                                    },
                                    label: `${city.name}, ${city.countryCode}`
                                }
                            })
                    }
                })
        )
    }

    return (
        <AsyncPaginate
            loadOptions={handleLoadOptions}
            placeholder="Search for a city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            styles={{
                container: (base, state) => ({
                    ...base,
                    width: "80%",
                }),
                control: (base, state) => ({
                    ...base,
                    backgroundColor: "var(--bg-input-control)",
                    border: "none",
                    ":hover": {
                        border: "none",
                    },
                    boxShadow: "none"
                }),
                menuList: (base, state) => ({
                    ...base,
                    backgroundColor: "var(--bg-input-menu)"
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "var(--bg-input-option)" : "transparent",
                    fontWeight: state.isFocused ? "900" : "600"
                }),
                input: (base, state) => ({
                    ...base,
                    color: "var(--txt-primary)",
                    cursor: "text"
                }),
                placeholder: (base, state) => ({
                    ...base,
                    color: "var(--txt-input-placeholder)"
                })
            }}
        />
    )
}