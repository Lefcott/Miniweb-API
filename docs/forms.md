# Colección `forms`:

```json
{
  "_id": ObjectId("60614b48a28faa8bc72e08d6"),
  "code": "miniweb_creation",
  "project_code": "miniweb",
  "name": "Creación de MiniWeb",
  "showable": true,
  "editable": true,
  "fields": [
    {
      "language": {
        "en": {
          "name": "Card Type"
        },
        "es": {
          "name": "Tipo de Tarjeta"
        }
      },
      "_id": ObjectId("60678858590a3000156d4d10"),
      "important": true,
      "is_required": true,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "free_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Selecciona el Tipo de MiniWeb que deseas.",
        "en": "MiniWeb Type"
      },
      "key": "card_type",
      "name": "Tipo de MiniWeb",
      "step": 1,
      "input_type": "select-buttons",
      "select_button_options": [
        {
          "language": {
            "en": {
              "title": "Free MiniWeb",
              "description": "For individuals, Freelancers and Students."
            },
            "es": {
              "title": "MiniWeb Gratis",
              "description": "Para individuos, Freelancers y Estudiantes."
            }
          },
          "_id": ObjectId("6067b9c1f44ca20015218838"),
          "value": "free"
        },
        {
          "language": {
            "en": {
              "title": "Premium Personal MiniWeb",
              "description": "For Businessmen, Freelancers, Restaurants, Small Business, Sales Agents, Real Estate and Insurance agent, SMEs, etc."
            },
            "es": {
              "title": "MiniWeb Premium Personal",
              "description": "Para Empresarios, Freelancers, Restaurantes, Pequeños Negocios, Agentes de Ventas, Inmobiliarios y de Seguros, PyMEs, etc."
            }
          },
          "_id": ObjectId("6067b9c1f44ca20015218839"),
          "value": "premium_personal"
        },
        {
          "language": {
            "en": {
              "title": "Premium Business MiniWeb",
              "description": "For Businessmen, Freelancers, Restaurants, Small Business, Sales Agents, Real Estate and Insurance agent, SMEs, etc. Note: for more than 30 users in the same company."
            },
            "es": {
              "title": "MiniWeb Premium de Negocio",
              "description": "Para Empresarios, Freelancers, Restaurantes, Pequeños Negocios, Agentes de Ventas, Inmobiliarios y de Seguros, PyMEs, etc. Nota: para + de 30 usuarios misma empresa."
            }
          },
          "_id": ObjectId("6067b9c1f44ca2001521883a"),
          "value": "premium_business"
        }
      ],
      "options": [],
      "subfields": []
    },
    {
      "language": {
        "en": {
          "name": "Destination"
        },
        "es": {
          "name": "Destino"
        }
      },
      "_id": ObjectId("60678858590a3000156d4d14"),
      "important": true,
      "is_required": true,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Selecciona si eres persona o negocio",
        "en": "Destination (person or business)"
      },
      "key": "destination",
      "name": "Destino (persona o negocio)",
      "step": 2,
      "input_type": "select-buttons",
      "select_button_options": [
        {
          "language": {
            "en": {
              "title": "Person",
              "description": "The card will be for a person."
            },
            "es": {
              "title": "Persona",
              "description": "La tarjeta será para una persona."
            }
          },
          "_id": ObjectId("6067b9c1f44ca2001521883c"),
          "value": "person"
        },
        {
          "language": {
            "en": {
              "title": "Business",
              "description": "The card will be for a business."
            },
            "es": {
              "title": "Negocio",
              "description": "La tarjeta será para un negocio."
            }
          },
          "_id": ObjectId("6067b9c1f44ca2001521883d"),
          "value": "business"
        }
      ],
      "options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a459"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb", "free_miniweb"],
      "names": {
        "es": "Sube aquí tu Foto de Portada/ Back",
        "en": "Cover Photo"
      },
      "key": "cover_photo",
      "step": 3,
      "input_type": "image",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a457"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb"],
      "names": {
        "es": "Sube aquí tu Foto de Perfil",
        "en": "Profile Photo"
      },
      "key": "profile_photo",
      "step": 3,
      "input_type": "image",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d17"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Escribe tu Nombre",
        "en": "Name"
      },
      "key": "name",
      "step": 3,
      "name": "Nombre",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0be"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica el nombre de la empresa o negocio",
        "en": "Business / Company name"
      },
      "key": "business_or_company",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d18"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Escribe tus Apellidos",
        "en": "Surnames"
      },
      "key": "surnames",
      "step": 3,
      "name": "Apellidos",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0bb"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb"],
      "names": {
        "es": "Comenta algo de ti",
        "en": "Tell us a little more about you"
      },
      "key": "personal_description",
      "step": 3,
      "input_type": "textarea-medium",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d19"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Escribe tu Cargo o Actividad Principal",
        "en": "Job or Main Activity"
      },
      "key": "job_title",
      "step": 3,
      "name": "Cargo / Actividad",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6096f8277087c0001530f233"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_business_miniweb"],
      "names": {
        "es": "Giro del negocio",
        "en": "Business type"
      },
      "key": "business_type",
      "step": 3,
      "name": "Cargo / Actividad",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d1a"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Cuantas con alguna Certificación o Diploma, indícalo aquí",
        "en": "Certifications"
      },
      "key": "certifications",
      "step": 3,
      "name": "Certificaciones",
      "input_type": "textarea-medium",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0bf"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_business_miniweb"],
      "names": {
        "es": "Cuéntanos un poco acerca del negocio",
        "en": "Tell us a little more about the business"
      },
      "key": "business_description",
      "step": 3,
      "input_type": "textarea-medium",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0c0"),
      "important": false,
      "is_required": true,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_business_miniweb"],
      "names": {
        "es": "Horarios de Atención al público",
        "en": "Business Hours"
      },
      "key": "business_hours",
      "step": 3,
      "input_type": "week-hours",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d1e"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica si tiene Servicio a Domicilio Si/ No",
        "en": "Home Service"
      },
      "key": "home_service",
      "step": 3,
      "name": "Servicio a Domicilio",
      "input_type": "checkbox",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d1f"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica si tu negocio cuenta con servicio Uber",
        "en": "Uber Service Zone"
      },
      "key": "uber_zone",
      "step": 3,
      "name": "Zona de servicio Uber",
      "input_type": "checkbox",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d20"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica si tu negocio cuenta con servicio Rappi si/no",
        "en": "Rappi Service Zone"
      },
      "key": "rappi_zone",
      "step": 3,
      "name": "Zona de servicio Rappi",
      "input_type": "checkbox",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d21"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica si tu negocio/ servicio, acepta Tarjeta de Débito Si/ No",
        "en": "Debit Card"
      },
      "key": "debit_card",
      "step": 3,
      "name": "Tarjeta de Débito",
      "input_type": "checkbox",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d22"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica si tu negocio/ servicio, acepta Tarjeta de Crédito Si/ No",
        "en": "Credit Card"
      },
      "key": "credit_card",
      "step": 3,
      "input_type": "checkbox",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d23"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu Correo Personal",
        "en": "Personal Email"
      },
      "key": "personal_email",
      "step": 3,
      "name": "Correo Personal",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d24"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu Correo de Empresa",
        "en": "Business Email"
      },
      "key": "business_email",
      "step": 3,
      "name": "Correo de Empresa",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d25"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu Número de Whatsapp (10 dígitos)",
        "en": "Whatsapp Number"
      },
      "key": "whatsapp_number",
      "step": 3,
      "name": "Número de Whatsapp",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0c9"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica la liga de tu Sitio Web",
        "en": "Website URL"
      },
      "key": "website_url",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d26"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de Facebook",
        "en": "Facebook URL"
      },
      "key": "facebook_url",
      "step": 3,
      "name": "URL de Facebook",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d27"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de Instagram",
        "en": "Instagram URL"
      },
      "key": "instagram_url",
      "step": 3,
      "name": "URL de Instagram",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d28"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de TikTok",
        "en": "TikTok URL"
      },
      "key": "tiktok_url",
      "step": 3,
      "name": "URL de TikTok",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d29"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de Twitter",
        "en": "Twitter URL"
      },
      "key": "twitter_url",
      "step": 3,
      "name": "URL de Twitter",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d2a"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de LinkedIn",
        "en": "LinkedIn URL"
      },
      "key": "linkedin_url",
      "step": 3,
      "name": "URL de LinkedIn",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d2b"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil de Pinterest",
        "en": "Pinterest URL"
      },
      "key": "pinterest_url",
      "step": 3,
      "name": "URL de Pinterest",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("60678858590a3000156d4d2c"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu liga de perfil  de Telegram",
        "en": "Telegram URL"
      },
      "key": "telegram_url",
      "step": 3,
      "name": "URL de Telegram",
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067acf5c2291e0015f2a415"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica el/ los Números de Teléfono de tu negocio",
        "en": "Phone Numbers"
      },
      "key": "phone_numbers",
      "step": 3,
      "input_type": "list",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a454"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "free_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica el Municipio",
        "en": "Municipality"
      },
      "key": "municipality",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0d4"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "free_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica la calle y número",
        "en": "Write the street and number"
      },
      "key": "address",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a455"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb", "free_miniweb"],
      "names": {
        "es": "Indica el Estado (aquí tenemos que meter un dropdown para 32 estados)",
        "en": "State"
      },
      "key": "state",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a456"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tu País (luego meteremos aquí los países de Latam)",
        "en": "Country"
      },
      "key": "country",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0d5"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": [
        "free_premium_miniweb",
        "premium_miniweb",
        "free_miniweb",
        "premium_business_miniweb"
      ],
      "names": {
        "es": "Indica la liga de Google Maps a tu ubicación",
        "en": "Google Maps location URL"
      },
      "key": "google_maps_url",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a453"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "free_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "indica tu Código Postal (5 dígitos)",
        "en": "Postal Code"
      },
      "key": "postal_code",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica el subdominio que deseas para tu MiniWeb (va a aparecer como <subdominio>.miniweb.online)",
        "en": "Specify the subdomain you would like for your MiniWeb (will appear as <subdomain>.miniweb.online)"
      },
      "key": "subdomain",
      "step": 3,
      "input_type": "text",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6067b00bc2291e0015f2a458"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_business_miniweb"],
      "names": {
        "es": "Sube aquí tu Logo",
        "en": "Logo"
      },
      "key": "logo",
      "step": 3,
      "input_type": "image",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tus Productos",
        "en": "Products"
      },
      "key": "products",
      "step": 4,
      "input_type": "group",
      "subfields": [
        {
          "_id": ObjectId("6067b13bc2291e0015f2a481"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "key": "photo",
          "name": "Foto",
          "input_type": "image",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("6067b13bc2291e0015f2a482"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "key": "title",
          "name": "Título",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("607ce7a8498647001525c0de"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "names": {
            "es": "Descripción",
            "en": "Description"
          },
          "key": "description",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        }
      ],
      "options": [],
      "select_button_options": []
    },
    {
      "_id": ObjectId("6067b13bc2291e0015f2a480"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Indica tus Servicios",
        "en": "Services"
      },
      "key": "services",
      "step": 4,
      "name": "Servicios",
      "input_type": "group",
      "subfields": [
        {
          "_id": ObjectId("6067b13bc2291e0015f2a481"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "key": "photo",
          "name": "Foto",
          "input_type": "image",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("6067b13bc2291e0015f2a482"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "key": "title",
          "name": "Título",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("607ce7a8498647001525c0de"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "names": {
            "es": "Descripción",
            "en": "Description"
          },
          "key": "description",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        }
      ],
      "options": [],
      "select_button_options": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0df"),
      "important": true,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Fotos o videos",
        "en": "Photos or videos"
      },
      "key": "photos_or_videos",
      "step": 4,
      "input_type": "group",
      "subfields": [
        {
          "_id": ObjectId("607ce7a8498647001525c0e0"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "names": {
            "es": "Foto o video",
            "en": "Photo or video"
          },
          "key": "photo_or_video",
          "input_type": "image",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("607ce7a8498647001525c0e2"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "names": {
            "en": "Title",
            "es": "Título"
          },
          "key": "title",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        },
        {
          "_id": ObjectId("607ce7a8498647001525c0e1"),
          "important": false,
          "is_required": true,
          "read_only": false,
          "fillable_by_user": true,
          "show_on_variants": [],
          "key": "price",
          "name": "Precio",
          "input_type": "text",
          "options": [],
          "select_button_options": [],
          "subfields": []
        }
      ],
      "options": [],
      "select_button_options": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0e3"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Sube documentos que creas que son relevantes",
        "en": "Upload documents here"
      },
      "file_options": {
        "max_files": 15,
        "max_size": "25MB"
      },
      "key": "files",
      "step": 5,
      "input_type": "files",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0e4"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Foto de fachada",
        "en": "Place photo"
      },
      "key": "business_photo",
      "step": 3,
      "input_type": "image",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("6096fbde7087c0001530f362"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb"],
      "names": {
        "es": "Foto de soporte",
        "en": "Support photo"
      },
      "key": "support_photo",
      "step": 3,
      "input_type": "image",
      "options": [],
      "select_button_options": [],
      "subfields": []
    },
    {
      "_id": ObjectId("607ce7a8498647001525c0e5"),
      "important": false,
      "is_required": false,
      "read_only": false,
      "fillable_by_user": true,
      "show_on_variants": ["free_miniweb", "premium_miniweb", "premium_business_miniweb"],
      "names": {
        "es": "Color de las plecas",
        "en": "Border colors"
      },
      "key": "border_color",
      "step": 6,
      "input_type": "color",
      "options": [],
      "select_button_options": [],
      "subfields": []
    }
  ],
  "steps": [
    {
      "name": {
        "en": "First, choose one MiniWeb type",
        "es": "Primero, elige un tipo de MiniWeb"
      }
    },
    {
      "name": {
        "en": "Now, choose a destination for the MiniWeb",
        "es": "Ahora, elige un destino para la MiniWeb"
      }
    },
    {
      "name": {
        "en": "Personal Data",
        "es": "Datos Personales"
      }
    },
    {
      "name": {
        "en": "Photos / Videos",
        "es": "Fotos / Videos"
      }
    },
    {
      "name": {
        "en": "Relevant documents",
        "es": "Documentos relevantes"
      }
    },
    {
      "name": {
        "en": "MiniWeb Design",
        "es": "Diseño de la MiniWeb"
      }
    }
  ],
  "variants": [
    {
      "key": "free_miniweb",
      "names": {
        "en": "Free MiniWeb",
        "es": "MiniWeb Gratis"
      }
    },
    {
      "key": "premium_miniweb",
      "names": {
        "en": "Premium Personal MiniWeb",
        "es": "MiniWeb Premium Personal"
      }
    },
    {
      "key": "premium_business_miniweb",
      "names": {
        "en": "Premium Business MiniWeb",
        "es": "MiniWeb Premium de Negocio"
      }
    }
  ],
  "__v": 43,
  "notifications": {
    "enabled": false,
    "emails": []
  }
}
```
