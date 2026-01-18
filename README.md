# 🧩 Dynamic Form Builder (Vue 3 + TypeScript)

Un **form-builder dynamique** basé sur **Vue 3 (Composition API)** et **TypeScript**, capable de générer des formulaires complets à partir d’un **schéma backend**, avec :

* composants de champs dynamiques
* slots personnalisables (prepend / append / custom)
* gestion centralisée de l’état
* gestion des erreurs
* visibilité conditionnelle
* UI surchargeable

---

## ✨ Fonctionnalités clés

* 🔄 **Formulaires dynamiques** depuis un schéma backend
* 🧱 **Composants de champs interchangeables** (`TextField`, `SelectField`, etc.)
* 🎯 **Slots dynamiques par champ** (ex: bouton afficher mot de passe)
* 👁 **Gestion de la visibilité conditionnelle** des champs
* ❌ **Gestion des erreurs centralisée** (champ + global)
* 🎨 **UI personnalisable** sans modifier le schéma backend
* 🧠 **Architecture headless & scalable**

---

## 📦 Installation

```bash
npm install @axproo/form-builder
```

Ou en local :

```ts
import DynamicForm from '@/components/DynamicForm.vue'
```

---

## 🚀 Utilisation basique

```vue
<DynamicForm
    form-id="login"
    :ui="uiConfig"
    form-class="space-y-6"
    button-class="btn-primary"
    @submit="onSubmit"
>
    <template #btnName>
        Connexion
    </template>
</DynamicForm>
```

```ts
const onSubmit = (data: Record<string, any>) => {
    console.log(data)
}
```

---

## 🧠 Schéma de formulaire (backend)

```json
{
  "fields": [
    {
      "name": "password",
      "label": "Mot de passe",
      "component": "TextField",
      "required": true,
      "attributes": {
        "type": "password"
      },
      "slots": {
        "append": "passwordToggleButton"
      }
    }
  ]
}
```

---

## 🎨 UI Override (frontend)

```ts
const uiConfig = {
    password: {
        wrapperClass: 'relative',
        labelClass: 'font-medium',
        spaceClass: 'mb-4'
    }
}
```

➡️ L’UI est fusionnée via `mergeSchemaUI` sans modifier le schéma backend.

---

## 🔌 Slots dynamiques par champ

### Exemple : bouton afficher / masquer le mot de passe

#### Dans le projet

```vue
<template #passwordToggleButton="{ toggle, showPassword }">
    <button type="button" @click="toggle">
        <EyeOff v-if="showPassword" />
        <Eye v-else />
    </button>
</template>
```

#### Dans `TextField`

```vue
<slot
    name="append"
    :toggle="toggleAppend"
    :showPassword="showPassword"
/>
```

✔️ Le champ expose des **actions** via les slots
✔️ Le projet les consomme librement

---

## 🧩 Architecture interne

```
DynamicForm
 ├─ useFormSchema      → récupération schéma backend
 ├─ useFormState       → initialisation de l’état
 ├─ useFormErrors      → gestion des erreurs
 ├─ useVisibility      → visibilité conditionnelle
 └─ Champs dynamiques
     ├─ TextField
     ├─ SelectField
     └─ ...
```

---

## ❌ Gestion des erreurs

* erreurs par champ
* erreur globale

```vue
<slot name="errorGlobal">
    {{ errorHandler.globalError.message }}
</slot>
```

Les erreurs sont automatiquement nettoyées lors des changements de valeur.

---

## 👁 Visibilité conditionnelle

```ts
isVisible(field)
```

Permet de masquer / afficher un champ selon :

* valeurs d’autres champs
* règles backend

---

## 🧪 Champs supportés

* `TextField`
* `PasswordField`
* `EmailField`
* `NumberField`
* `SelectField`
* `TextareaField`

(Extensible facilement)

---

## 🛠 Ajouter un nouveau champ

1. Créer le composant (`MyField.vue`)
2. Respecter l’interface `BaseFieldProps`
3. Exposer les slots nécessaires
4. L’enregistrer dans le resolver des composants

---

## 🔗 Intégration du plugin et chemins relatifs

### Installation et configuration

Le form-builder est un plugin Vue configurable. Il doit être installé avec la configuration apiBaseUrl et enableMock :

```bash
import { createApp } from 'vue'
import App from './App.vue'
import { FormBuilderPlugin } from '@axproo/form-builder'

createApp(App)
.use(FormBuilderPlugin, {
apiBaseUrl: import.meta.env.VITE_API_URL,
enableMock: import.meta.env.DEV
})
.mount('#app')
```

## Attention aux chemins relatifs

Tous les composants doivent être importés avec des chemins corrects par rapport au fichier FormBuilderPlugin.ts :

```bash
import DynamicForm from '../components/DynamicForm.vue'
import { TextField, CheckboxField, FileField, ... } from '../components/fields'
```

Option recommandée : créer un index.ts dans components/fields pour regrouper tous les exports, ce qui simplifie les imports dans le plugin.

✔️ Cela évite les erreurs de build (Could not resolve) et rend la librairie scalable et maintenable.

## 🧠 Philosophie

* Le **backend décrit le formulaire**
* Le **frontend contrôle le rendu**
* Les **champs exposent des capacités, pas des décisions**

➡️ Headless, modulaire, maintenable.

---

## 📄 Licence

MIT

---

## ✍️ Auteur

**Christian Djomou**
Form Builder dynamique – Vue 3 / TypeScript
