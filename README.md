# generator-aowp-marionette

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-aowp-marionette from npm, run:

```bash
npm install git+ssh://git@innersource.accenture.com:aowp/generator-aowp-marionette.git
```

Finally, initiate the generator:

```bash
yo aowp-marionette
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## AOWP Marionette Generator

### Usage
Install: `npm install -g aowp-marionette`

Switch to the folder where you want to generate your application and run: ` yo aowp:marionette` and follow instructions on the screen.

All options can be also typed with the shortcut containing dash and the first letter of the option:

* --directory as -d
* --model as -m
* --itemview as -i
* --template as -t

### Subgenerators
 - aowp-marionette:model
 - aowp-marionette:collection
 - aowp-marionette:itemview
 - aowp-marionette:collectionview
 - aowp-marionette:layoutview
 - aowp-marionerre:router
 - aowp-marionette:controller
 - aowp-marionette:crud

### Model
Model is generated via command:

`yo aowp-marionette:model <model-name> --directory <folder-name>`

Generated file structure:

```
 <folder-name>
      |- <model-name>-model.js
      |- <model-name>-model-test.js
```
### Collection
Collection is generated via command:

`yo aowp-marionette:collection <collection-name> --directory <folder-name> --model <model-name>`

This command will generate only collection and collection test and it uses specified existed model.

Generated file structure:

```
 <folder-name>
      |- <collection-name>-collection.js
      |- <collection-name>-collection-test.js
```

If you want to create also model to this collection, use the command:

`yo aowp-marionette:collection <collection-name> --directory <folder-name>`

Generating collection with this command will cause also generating new model and its test.

Generated file structure:

```
 <folder-name>
      |- <collection-name>-collection.js
      |- <collection-name>-collection-test.js
      |- <model-name>-model.js
```
### Item View
Item view is generated via command:

`yo aowp-marionette:itemview <item-view-name> --directory <folder-name> --template <template-name>`

The <template-name> should be full name of already existing template. This will generate item view and reuse the specified template.

Generated file structure: 

```
 <folder-name> 
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
```

Typing command without template flag will cause generating item view with new template.

`yo aowp-marionette:itemview <item-view-name> --directory <folder-name>`

Generated file structure:

```
 <folder-name>
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-template.hbs
```
### Collection View
Collection view is generated via command:

`yo aowp-marionette:collectionview <collection-view-name> --directory <folder-name> --childview <item-view-name>`

This command wil generate only collection-view and its test. As a child view there will be used specified item view.

Generated file structure:

```
 <folder-name>
      |- <collection-view-name>-collection-view.js
      |- <collection-view-name>-collection-view-test.js
```

Collection view can be also generated without flags for child view and template:

`yo aowp-marionette:collectionview <collection-view-name> --directory <folder-name>`

This command will generate also new item view as a child view and new template.

Generated file structure:

```
 <folder-name>
      |- <collection-view-name>-collection-view.js
      |- <collection-view-name>-collection-view-test.js
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-template.hbs
```
### Composite View
Collection view is generated via command: 

`yo aowp-marionette:compositeview <composite-view-name> --directory <folder-name> --itemview <item-view-name> --template <compositeview-template-name> --itemviewtmp <itemview-template-name>`

The <compositeview-template-name> and <itemview-template-name> should be full names of already existing templates for composite view and for item view. This command will generate only collection-view and its test. As a child view there will be used specified item view, the for the template it will be used specified composite view template.

Generated file structure: 

```
 <folder-name> 
      |- <composite-view-name>-composite-view.js
      |- <composite-view-name>-composite-view-test.js
```

Collection view can be also generated without flags for reusing item view and without reusing composite view template: 

`yo aowp-marionette:collectionview <collection-view-name> --directory <folder-name>`

This command will generate new item view, new item view template and new composite view template.

Generated file structure: 

```
 <folder-name> 
      |- <composite-view-name>-composite-view.js
      |- <composite-view-name>-composite-view-test.js
      |- <composite-view-name>-composite-view-template.hbs
      |- <item-view-name>-item-view.js
      |- <item-view-name>-item-view-test.js
      |- <item-view-name>-template.hbs
```

### Layout View
Layout view is generated via command:

`yo aowp-marionette:layoutview <layout-view-name> --directory <folder-name>` --template <template-name>

Generated file structure:

```
 <folder-name>
      |- <layout-view-name>-item-view.js
      |- <layout-view-name>-item-view-test.js
      |- <layout-view-name>-template.hbs
```

### Router
Router is generated via command:

`yo aowp-marionette:router <router-name> --directory <folder-name> --controller <controller-name>`

This will generate only router and as a controller there will be used specified controller.

Generated file structure:

```
 <folder-name>
      |- <router-name>-router.js
```

Second command for generation of router:

`yo aowp-marionette:router <router-name> --directory <folder-name>`

This will generate router and also new controller.

Generated file structure:

```
 <folder-name>
      |- <router-name>-router.js
      |- <controller-name>-controller.js
```
### Controller
Controller is generated via command:

`yo aowp-marionette:controller <controller-name> --directory <folder-name>`

Generated file structure:

```
 <folder-name>
      |- <controller-name>-controller.js
```
### Crud
It is also possible to generate a crud application with this generator, just by running command:

`yo aowp-marionette:crud <crud-name> --directory <folder-name>`

## License

MIT
